import HttpError from "../components/httpError";
import api from "../axios/conf";

const getVehicles = async(authToken) => {
    try {
        const token = authToken.replace(/"/g, '');
        const response = await api.post(
            `DEMO/api/v1/getVehiclesDisp/${token}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return new HttpError(error);
    }
}
const apiService = { getVehicles };

export default apiService;