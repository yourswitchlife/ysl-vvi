import express from 'express';
const router = express.Router();
import db from '../configs/db.mjs';


/* router.get('/', async (req, res) => {
    try {
        const query = `
        SELECT img_details FROM product
        WHERE img_details IS NOT NULL AND img_details != ''
        ORDER BY RAND()
        LIMIT 5
    `;
        const [data] = await db.query(query);
        const items = data.map(row => row.img_details.split(',')[0]);
        const responseData = {
            items: items
        };
        console.log(responseData)
        res.json(responseData);

    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'error fetching notify coupon.' });
    }
}); */






export default router
