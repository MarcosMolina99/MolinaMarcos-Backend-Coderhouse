import { Router } from "express";
import { productMocks } from "../../public/utils";

const router = Router();

router.get("/", (req,res) => {
    const products = [];
    for(let i=0; i<100; i++){
        products.push(productMocks());
    }

    res.render("mocking", {products});
})

export default router;