package opensource.eatme.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final String apiKey = "74d0ba34312f47aa837c"; // 추후 yml로 이동 권장
    private final String baseUrl = "http://openapi.foodsafetykorea.go.kr/api";

    public JsonNode getRecipesByIngredient(String ingredient) {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String url = String.format(
                    "%s/%s/COOKRCP01/json/1/100/RCP_NM=%s",
                    baseUrl, apiKey, ingredient
            );

            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);

            if (root.has("COOKRCP01") && root.get("COOKRCP01").has("row")) {
                ArrayNode rawArray = (ArrayNode) root.get("COOKRCP01").get("row");
                List<ObjectNode> filteredList = new ArrayList<>();

                for (JsonNode recipe : rawArray) {
                    ObjectNode filtered = objectMapper.createObjectNode();
                    String ingredients = recipe.path("RCP_PARTS_DTLS").asText();

                    filtered.put("name", recipe.path("RCP_NM").asText());
                    filtered.put("ingredients", ingredients);
                    filtered.put("image", recipe.path("ATT_FILE_NO_MAIN").asText());
                    filtered.put("method", recipe.path("RCP_WAY2").asText());
                    filtered.put("calories", recipe.path("INFO_ENG").asText());

                    // 재료 수 계산
                    int ingredientCount = ingredients.isEmpty() ? 0 : ingredients.split(",").length;
                    filtered.put("ingredientCount", ingredientCount);

                    filteredList.add(filtered);
                }

                // 재료 수 기준 오름차순 정렬
                filteredList.sort(Comparator.comparingInt(node -> node.get("ingredientCount").asInt()));

                // 결과 배열 생성
                ArrayNode sortedArray = objectMapper.createArrayNode();
                for (ObjectNode item : filteredList) {
                    item.remove("ingredientCount"); // 정렬용 필드는 제거
                    sortedArray.add(item);
                }

                return sortedArray;
            } else {
                System.err.println("레시피 데이터가 없습니다.");
                return objectMapper.createArrayNode(); // 빈 배열 반환
            }

        } catch (Exception e) {
            e.printStackTrace();
            return objectMapper.createArrayNode(); // 예외 발생 시에도 빈 배열 반환
        }
    }
}
