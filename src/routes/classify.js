import axios from "axios";
import { Router } from "express";

const router = Router();

router.get("/classify", async (req, res) => {
    const name = req.query.name;

    // input validation 1: missing or empty
    if (!name || name.trim() === "") {
        return res.status(400).json({
            status: "error",
            message: "name query parameter is required"
        });
    }

    // input validation 2: is a number not a string
    if (!isNaN(name)) {
        return res.status(422).json({
            status: "error",
            message: "name must be a string, not a number"
        });
    }

    try {
        // call Genderize API
        const response = await axios.get(`https://api.genderize.io?name=${name}`)
        const data = response.data

        // edge case: no prediction available
        if (data.gender === null || data.count === 0) {
            return res.status(404).json({
                status: "error",
                message: "No prediction available for the provided name"
            });
        }

        //data
        const gender = data.gender
        const probability = data.probability
        const sample_size = data.count
        const is_confident = probability >= 0.7 && sample_size >= 100
        const processed_at = new Date().toISOString()

        // return response
        return res.json({
            status: "success",
            data: {
                name,
                gender,
                probability,
                sample_size,
                is_confident,
                processed_at
            }
        })

    } catch (error) {
        // if API fail
        return res.status(502).json({
            status: "error",
            message: "Failed to reach Genderize API, please try again"
        })
    }
});

export default router;