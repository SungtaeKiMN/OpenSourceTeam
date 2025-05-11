package opensource.eatme.service;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RecipeService {

    private final String apiKey = "74d0ba34312f47aa837c"; // 추후 yml에서 가져오도록 개선 가능
    private final String baseUrl = "http://openapi.foodsafetykorea.go.kr/api";

    public JsonNode getRecipesByIngredient(String ingredient) {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String url = String.format(
                    "%s/%s/COOKRCP01/json/1/10/RCP_NM=%s",
                    baseUrl, apiKey, ingredient
            );

            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);

            // COOKRCP01 > row 배열만 반환
            if (root.has("COOKRCP01") && root.get("COOKRCP01").has("row")) {
                ArrayNode filteredArray = objectMapper.createArrayNode();
                for (JsonNode recipe : root.get("COOKRCP01").get("row")) {
                    ObjectNode filtered = objectMapper.createObjectNode();
                    filtered.put("name", recipe.path("RCP_NM").asText());
                    filtered.put("ingredients", recipe.path("RCP_PARTS_DTLS").asText());
                    filtered.put("image", recipe.path("ATT_FILE_NO_MAIN").asText());
                    filtered.put("method", recipe.path("RCP_WAY2").asText());
                    filtered.put("calories", recipe.path("INFO_ENG").asText());
                    filteredArray.add(filtered);
                }
                return filteredArray;
            } else {
                System.err.println("레시피 데이터가 없습니다.");
                return null;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
