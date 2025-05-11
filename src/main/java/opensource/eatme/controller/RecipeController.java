package opensource.eatme.controller;

import opensource.eatme.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.JsonNode;


@RestController
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/recipes")
    public JsonNode getRecipes(@RequestParam String ingredient) {
        return recipeService.getRecipesByIngredient(ingredient);
    }
}
