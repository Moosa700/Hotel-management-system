import api from "./api";

export async function getBills() {
	const response = await api.get("/billing");
	return response.data.data ?? response.data;
}

export async function getMyBills() {
	const response = await api.get("/billing/mine");
	return response.data.data ?? response.data;
}

export async function markBillPaid(id) {
	const response = await api.patch(`/billing/${id}/pay`);
	return response.data.data ?? response.data;
}
