const API_BASE = '/api'

export const api = {
  async get(endpoint) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: this._headers()
    })
    return this._handleResponse(res)
  },

  async post(endpoint, data) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify(data)
    })
    return this._handleResponse(res)
  },

  async put(endpoint, data) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: this._headers(),
      body: JSON.stringify(data)
    })
    return this._handleResponse(res)
  },

  async delete(endpoint) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
      headers: this._headers()
    })
    return this._handleResponse(res)
  },

  _headers() {
    const headers = { 'Content-Type': 'application/json' }
    const token = localStorage.getItem('token')
    if (token) headers['Authorization'] = `Bearer ${token}`
    return headers
  },

  _handleResponse(res) {
    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }
      return null
    }
    return res.text().then(text => {
      if (!text) {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        }
        return null
      }
      const data = JSON.parse(text)
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = '/login'
        }
        throw new Error(data.error || 'Request failed')
      }
      return data
    })
  }
}

export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/login'
}

export const studentApi = {
  async getAttendance(studentRollNo) {
    return api.get(`/attendance?studentRollNo=${studentRollNo}`)
  },

  async getResults(studentRollNo) {
    return api.get(`/results?studentRollNo=${studentRollNo}`)
  },

  async getTimetable(year = 'III', section = 'A') {
    return api.get(`/timetable?year=${year}&section=${section}`)
  },

  async getFee(studentRollNo) {
    return api.get(`/fee?studentRollNo=${studentRollNo}`)
  },

  async getStudent(rollNo) {
    return api.get(`/students/${rollNo}`)
  },
}

export const adminApi = {
  async getStats() {
    return api.get('/stats')
  },

  async getStudents() {
    return api.get('/students')
  },
}

export const placementApi = {
  async getDrives(status) {
    const query = status ? `?status=${status}` : ''
    return api.get(`/placement/drives${query}`)
  },

  async getMyApplications(studentRollNo) {
    return api.get(`/placement/my-applications?studentRollNo=${studentRollNo}`)
  },

  async apply(studentRollNo, driveId) {
    return api.post('/placement/apply', { studentRollNo, driveId })
  },

  async getStats() {
    return api.get('/placement/stats')
  },
}

export const facultyApi = {
  async getFaculty(empId) {
    return api.get(`/faculty/${empId}`)
  },

  async getClasses(empId) {
    return api.get(`/faculty/${empId}/classes`)
  },

  async getStudents(year, section) {
    const query = new URLSearchParams()
    if (year) query.append('year', year)
    if (section) query.append('section', section)
    return api.get(`/faculty/FAC001/students?${query.toString()}`)
  },
}

export const announcementApi = {
  async getAll() {
    return api.get('/announcements')
  },

  async getById(id) {
    return api.get(`/announcements/${id}`)
  },

  async create(data) {
    return api.post('/announcements', data)
  },

  async delete(id) {
    return api.delete(`/announcements/${id}`)
  },
}

export const leaveApi = {
  async getAll(params = {}) {
    const query = new URLSearchParams(params)
    return api.get(`/leave?${query.toString()}`)
  },

  async getMy(rollNo) {
    return api.get(`/leave/my?rollNo=${rollNo}`)
  },

  async create(data) {
    return api.post('/leave', data)
  },

  async update(id, data) {
    return api.put(`/leave/${id}`, data)
  },

  async getPending(forType) {
    return api.get(`/leave/pending?forType=${forType}`)
  },
}

export const odApi = {
  async getAll(params = {}) {
    const query = new URLSearchParams(params)
    return api.get(`/od?${query.toString()}`)
  },

  async getMy(rollNo) {
    return api.get(`/od/my?rollNo=${rollNo}`)
  },

  async create(data) {
    return api.post('/od', data)
  },

  async update(id, data) {
    return api.put(`/od/${id}`, data)
  },

  async getPending() {
    return api.get('/od/pending')
  },
}

export const authApi = {
  async me() {
    return api.get('/auth/me')
  },
}
