const API_URL = import.meta.env.VITE_API_URL

// Helper function to call backend with JWT (from localStorage)
export function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  // Add Authorization if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return fetch(`${API_URL}${endpoint}`, { ...options, headers }).then(
    (response) => {
      if (!response.ok) {
        return response
          .json()
          .then((errData) => {
            const errorMessage =
              errData.message || `API error: ${response.status}`
            throw new Error(errorMessage)
          })
          .catch((errData) => {
            const errorMessage =
              errData.message || `API error: ${response.status}`
            throw new Error(errorMessage)
          })
      }
      return response.json()
    }
  )
}
//updateUserProfileAPI
export function updateUserProfileApi(updatedProfile) {
  const token = localStorage.getItem('token')
  function handleText(res, text) {
    var data
    try {
      data = JSON.parse(text)
    } catch (e) {
      data = text
    }
    if (!res.ok) {
      if (typeof data === 'object' && data !== null) {
        return Promise.reject(data)
      } else {
        return Promise.reject({ message: data })
      }
    }
    return data
  }

  function parseResponse(res) {
    return res.text().then(handleText.bind(null, res))
  }

  return fetch(`${API_URL}/api/users/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // Only add if token exists
    },
    body: JSON.stringify(updatedProfile),
  }).then(parseResponse)
}
//updateAvatar
export function updateAvatarApi(formData) {
  const token = localStorage.getItem('token')
  return fetch(`${API_URL}/api/users/profile/avatar`, {
    method: 'PATCH',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // Do NOT set Content-Type for FormData, browser does it
    },
    body: formData,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to update avatar', err.message)
    })
}
//delete account
export const deleteAccountApi = () => {
  const token = localStorage.getItem('token')
  return fetch(`${API_URL}/api/users/profile/deleteAccount`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

//change password
export const changePasswordApi = ({ currentPassword, newPassword }) => {
  const token = localStorage.getItem('token')
  return fetch(`${API_URL}/api/users/profile/changePassword`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  })
}

//CreateMael
export const createMealApi = (meal) => {
  const token = localStorage.getItem('token')
  return fetch(`${API_URL}/api/meals/createMeal`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(meal),
  })
}
//Get user`s meals to profile
export const getDonationsApi = () => {
  const token = localStorage.getItem('token')
  return fetch(`${API_URL}/api/meals/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

//update the selected meal
export const updateMealApi = (mealId, updatedMeal) => {
  const token = localStorage.getItem('token')
  return fetch(`${API_URL}/api/meals/profile/${mealId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedMeal),
  })
}

// delete the selected meal

export const deleteMealApi = (mealId, selectedMeal) => {
  const token = localStorage.getItem('token')
  return fetch(`${API_URL}/api/meals/profile/${mealId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

// mark the selected meal as pick up
export const completeMealPickUpApi = (mealId) => {
  const token = localStorage.getItem('token')
  return fetch(`${API_URL}/api/meals/${mealId}/completePickup`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pickedUp: true }),
  })
}

//get donations for explore food
export const getDonationsExplorePageApi = () => {
  const token = localStorage.getItem('token')
  return fetch(`${API_URL}/api/meals/exploreFood`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
