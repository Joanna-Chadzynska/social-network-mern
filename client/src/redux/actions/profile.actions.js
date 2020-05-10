import axios from "axios";
import { setAlert } from "./alert.actions";
import { PROFILE_ACTION_TYPES } from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile/me");
		dispatch({ type: PROFILE_ACTION_TYPES.GET_PROFILE, payload: res.data });
	} catch (error) {
		dispatch({
			type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

export const clearProfile = () => ({
	type: PROFILE_ACTION_TYPES.CLEAR_PROFILE,
});

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.post("/api/profile", formData, config);

		dispatch({ type: PROFILE_ACTION_TYPES.GET_PROFILE, payload: res.data });
		dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

		if (!edit) {
			history.push("/dashboard");
		}
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.put("/api/profile/experience", formData, config);

		dispatch({ type: PROFILE_ACTION_TYPES.UPDATE_PROFILE, payload: res.data });
		dispatch(setAlert("Experience added", "success"));

		history.push("/dashboard");
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);
		dispatch({ type: PROFILE_ACTION_TYPES.UPDATE_PROFILE, payload: res.data });
		dispatch(setAlert("Experience removed", "success"));
	} catch (error) {
		dispatch({
			type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.put("/api/profile/education", formData, config);

		dispatch({ type: PROFILE_ACTION_TYPES.UPDATE_PROFILE, payload: res.data });
		dispatch(setAlert("Education added", "success"));

		history.push("/dashboard");
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`);
		dispatch({ type: PROFILE_ACTION_TYPES.UPDATE_PROFILE, payload: res.data });
		dispatch(setAlert("Education removed", "success"));
	} catch (error) {
		dispatch({
			type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// Delete account and profile
export const deleteAccountAndProfile = () => async (dispatch) => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		try {
			await axios.delete(`/api/profile`);

			dispatch({
				type: PROFILE_ACTION_TYPES.CLEAR_PROFILE,
			});

			dispatch({ type: PROFILE_ACTION_TYPES.ACCOUNT_DELETED });

			dispatch(
				setAlert("Your account has been permanently deleted", "success")
			);
		} catch (error) {
			dispatch({
				type: PROFILE_ACTION_TYPES.PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status,
				},
			});
		}
	}
};

// @todo - update experience and education
