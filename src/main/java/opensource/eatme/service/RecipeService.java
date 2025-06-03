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

    private final String apiKey = "74d0ba34312f47aa837c";
    private final String baseUrl = "http://openapi.foodsafetykorea.go.kr/api";

    public JsonNode getRecipesByIngredient(String ingredient) {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String url = String.format(
                    "%s/%s/COOKRCP01/json/1/1000/RCP_NM=%s",
                    baseUrl, apiKey, ingredient
            );

            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);

            if (root.has("COOKRCP01") && root.get("COOKRCP01").has("row")) {
                ArrayNode rawArray = (ArrayNode) root.get("COOKRCP01").get("row");
                List<ObjectNode> filteredList = new ArrayList<>();

                for (JsonNode recipe : rawArray) {
                    ObjectNode filtered = objectMapper.createObjectNode();
                    String name = recipe.path("RCP_NM").asText();
                    String ingredients = recipe.path("RCP_PARTS_DTLS").asText();

                    StringBuilder stepsBuilder = new StringBuilder();
                    for (int i = 1; i <= 20; i++) {
                        String step = recipe.path("MANUAL" + String.format("%02d", i)).asText().trim();
                        if (!step.isEmpty()) {
                            stepsBuilder.append(step).append("\n");
                        }
                    }

                    String[] stepArray = stepsBuilder.toString().trim().split("\n");

                    filtered.put("name", name);
                    filtered.put("ingredients", ingredients);
                    ArrayNode stepNode = objectMapper.createArrayNode();
                    for (String step : stepArray) {

                        String cleaned = step.replaceFirst("^\\d+\\.\\s*\\d+\\.\\s*", "")
                                .replaceFirst("^\\d+\\.\\s*", "");
                        stepNode.add(cleaned.trim());
                    }
                    filtered.set("steps", stepNode);

                    int ingredientCount = ingredients.isEmpty() ? 0 : ingredients.split(",").length;
                    filtered.put("ingredientCount", ingredientCount);

                    filteredList.add(filtered);
                }

                filteredList.sort(Comparator.comparingInt(n -> n.get("ingredientCount").asInt()));

                ArrayNode result = objectMapper.createArrayNode();
                for (ObjectNode item : filteredList) {
                    item.remove("ingredientCount");
                    result.add(item);
                }


                return result;
            } else {
                return objectMapper.createArrayNode();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ObjectMapper().createArrayNode();
        }
    }
}
