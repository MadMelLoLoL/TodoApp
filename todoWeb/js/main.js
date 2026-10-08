function moveOverdueTasksToToday(tasks, now = new Date()) {
    const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0")
    ].join("-");
    const overdueTasks = tasks
        .filter(task => task.date && task.date < today)
        .sort((a, b) => {
            const dateOrder = a.date.localeCompare(b.date);
            return dateOrder || (a.order ?? 0) - (b.order ?? 0);
        });

    if (overdueTasks.length === 0) {
        return false;
    }

    const todayTasks = tasks
        .filter(task => task.date === today)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const movedTasks = new Set(overdueTasks);
    const otherTasks = tasks.filter(
        task => task.date !== today && !movedTasks.has(task)
    );
    const updatedTodayTasks = [...todayTasks, ...overdueTasks];

    updatedTodayTasks.forEach((task, index) => {
        if (overdueTasks.includes(task) && !task.completed) {
            task.overdue = true;
        }

        task.date = today;
        task.order = index;
    });

    tasks.splice(
        0,
        tasks.length,
        ...otherTasks,
        ...updatedTodayTasks
    );

    return true;
}