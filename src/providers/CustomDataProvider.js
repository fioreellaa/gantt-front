
import RestDataProvider from "ra-data-simple-rest";


class CustomDataProvider extends RestDataProvider {
  async addTask(task) {
    try {
      const body = {
        name_task: task.text,
        start_date: task.start,
        end_date: task.end,
        progress: task.progress ?? 0,
        state: task.state ?? 1,
        parent_id: task.parent ?? null,
        id_project: task.project, // Asegúrate de enviar el ID del proyecto si es necesario
      };

      const res = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Error guardando la tarea");
      }

      const savedTask = await res.json();

      return {
        ...task,
        id: savedTask.id_task, // el Gantt necesita el nuevo ID
      };
    } catch (error) {
      console.error("🛑 Error en addTask:", error);
      throw error;
    }
  }

  
  async updateTask(task) {
    try {
      const body = {
        id_task: task.id,
        name_task: task.text,
        start_date: task.start,
        end_date: task.end,
        progress: task.progress ?? 0,
        state: task.state ?? 1,
      };

      const res = await fetch(`${BASE_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Error actualizando la tarea");
      }

      return task;
    } catch (error) {
      console.error("🛑 Error en updateTask:", error);
      throw error;
    }
  }

  async deleteTask(taskId) {
    try {
      const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error eliminando la tarea");
      }
    } catch (error) {
      console.error("🛑 Error en deleteTask:", error);
      throw error;
    }
  }
}