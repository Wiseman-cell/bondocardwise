const express = require('express');
const router = express.Router();

// @route   POST api/chat
// @desc    Handle chat requests
// @access  Private
router.post('/', async (req, res) => {
    const { message, userId } = req.body;

    // Critical Payment Logic: Check user's balance (from a database)
    // For now, we'll assume the user has enough credits
    const hasEnoughCredits = true; // a mock value

    if (!hasEnoughCredits) {
        return res.status(402).json({ error: 'Insufficient credits' });
    }

    try {
        // Call to OpenAI Chat Completions API (or similar) with streaming enabled
        // This is a placeholder for the actual API call
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const stream = async () => {
            for (let i = 0; i < message.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 100));
                const chunk = message[i];
                res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
            }
            res.end();
        }
        stream();

        // Post-Request Logic: Deduct the calculated cost (in credits) from the user's balance
        console.log('Deducting credits for user:', userId);

    } catch (error) {
        console.error('Error processing chat request:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
