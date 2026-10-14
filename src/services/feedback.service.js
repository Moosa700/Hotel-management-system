import api from "./api";

export async function getFeedback() {
	const response = await api.get("/feedback");
	return response.data.data ?? response.data;
}

export async function createFeedback(feedback) {
	const response = await api.post("/feedback", feedback);
	return response.data.data ?? response.data;
}

export async function approveFeedback(id) {
	const response = await api.patch(`/feedback/${id}/approve`);
	return response.data.data ?? response.data;
}

export async function rejectFeedback(id) {
	const response = await api.patch(`/feedback/${id}/reject`);
	return response.data.data ?? response.data;
}
