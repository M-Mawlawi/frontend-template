import HttpError from "../components/httpError";
import api from "../axios/conf";

const getVehicles = async(authToken) => {
    try {
        const response = await api.post(
            `DEMO/api/v1/getVehiclesDisp/`, { authToken }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return new HttpError(error);
    }
}
const apiService = { getVehicles };

export default apiService;