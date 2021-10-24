export const getTasksStats = (tasks) => {
  let finishedTasksCount = 0;
  let finishedTasksAfterDeadline = 0;
  let unfinishedTasksCount = 0;
  let missedTasksCount = 0;

  tasks.forEach((task) => {
    if (task.user_task.completed === 1) {
      if (
        new Date(task.user_task.deadline).getTime() <
        new Date(task.user_task.updated_at).getTime()
      ) {
        finishedTasksAfterDeadline++;
      } else {
        finishedTasksCount++;
      }
    } else {
      // Check if this task deadline is before Date.now()
      if (new Date(task.user_task.deadline).getTime() < new Date().getTime()) {
        missedTasksCount++;
      } else {
        unfinishedTasksCount++;
      }
    }
  });

  return [
    finishedTasksCount,
    finishedTasksAfterDeadline,
    unfinishedTasksCount,
    missedTasksCount,
  ];
};

export const getNotesStats = (notes) => {
  let positiveNotesCount = 0;
  let negativeNotesCount = 0;

  notes.forEach((note) => {
    if (note.positive === 1) {
      positiveNotesCount++;
    } else {
      negativeNotesCount++;
    }
  });

  return [negativeNotesCount, positiveNotesCount];
};

export const getCoursesStats = (courses) => {};
