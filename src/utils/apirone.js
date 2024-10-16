import axios from 'axios';

const apiUrl = 'https://apirone.com/api/v2/invoices';

// Create an invoice for the top-up
export const createInvoice = async (amount, currency, callbackUrl) => {
    try {
        const response = await axios.post(apiUrl, {
            amount,
            currency,
            callback: callbackUrl
        });
        return response.data;
    } catch (error) {
        console.error("Error creating invoice", error);
        throw error;
    }
};

// Check the payment status
export const checkPaymentStatus = async (invoiceId) => {
    try {
        const response = await axios.get(`${apiUrl}/${invoiceId}`);
        return response.data;
    } catch (error) {
        console.error("Error checking payment status", error);
        throw error;
    }
};

// Forward the payment to the destination address
export const forwardPayment = async (invoiceId, destinationAddress) => {
    try {
        const response = await axios.post(`${apiUrl}/${invoiceId}/forward`, {
            address: destinationAddress
        });
        return response.data;
    } catch (error) {
        console.error("Error forwarding payment", error);
        throw error;
    }
};
