const gradeService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "assignment_name_c" } },
          { field: { Name: "score_c" } },
          { field: { Name: "max_score_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "student_id_c" } },
          { field: { Name: "class_id_c" } },
          { field: { Name: "Tags" } }
        ]
      }
      
      const response = await apperClient.fetchRecords("grade_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching grades:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "assignment_name_c" } },
          { field: { Name: "score_c" } },
          { field: { Name: "max_score_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "student_id_c" } },
          { field: { Name: "class_id_c" } },
          { field: { Name: "Tags" } }
        ]
      }
      
      const response = await apperClient.getRecordById("grade_c", id, params)
      
      if (!response.success) {
        console.error(response.message)
        return null
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching grade with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async create(gradeData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        records: [
          {
            Name: gradeData.Name || gradeData.assignment_name_c,
            assignment_name_c: gradeData.assignment_name_c,
            score_c: gradeData.score_c,
            max_score_c: gradeData.max_score_c,
            date_c: gradeData.date_c,
            category_c: gradeData.category_c,
            student_id_c: parseInt(gradeData.student_id_c),
            class_id_c: parseInt(gradeData.class_id_c),
            Tags: gradeData.Tags || ""
          }
        ]
      }
      
      const response = await apperClient.createRecord("grade_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create grade records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulRecords[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating grade:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async update(id, gradeData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const updateData = {
        Id: id
      }
      
      // Only include Updateable fields
      if (gradeData.Name !== undefined) updateData.Name = gradeData.Name
      if (gradeData.assignment_name_c !== undefined) updateData.assignment_name_c = gradeData.assignment_name_c
      if (gradeData.score_c !== undefined) updateData.score_c = gradeData.score_c
      if (gradeData.max_score_c !== undefined) updateData.max_score_c = gradeData.max_score_c
      if (gradeData.date_c !== undefined) updateData.date_c = gradeData.date_c
      if (gradeData.category_c !== undefined) updateData.category_c = gradeData.category_c
      if (gradeData.student_id_c !== undefined) updateData.student_id_c = parseInt(gradeData.student_id_c)
      if (gradeData.class_id_c !== undefined) updateData.class_id_c = parseInt(gradeData.class_id_c)
      if (gradeData.Tags !== undefined) updateData.Tags = gradeData.Tags
      
      const params = {
        records: [updateData]
      }
      
      const response = await apperClient.updateRecord("grade_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update grade records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulUpdates[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating grade:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        RecordIds: [id]
      }
      
      const response = await apperClient.deleteRecord("grade_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete grade records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message)
          })
        }
        
        return true
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting grade:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  }
}
export default gradeService