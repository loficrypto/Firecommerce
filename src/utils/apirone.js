import axios from 'axios';

export const createInvoice = async (currency, amount, callback) => {
    try {
        const response = await axios.post('https://apirone.com/api/v2/invoices', {
            currency,
            amount,
            callback
        });
        return response.data;
    } catch (error) {
        console.error("Error creating invoice", error);
    }
};
