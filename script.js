let tasks = [];
let taskId = 1;

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');
const completionRateEl = document.getElementById('completionRate');

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const subject = document.getElementById('taskSubject').value;
    const dueDate = document.getElementById('taskDue').value;
    const priority = document.getElementById('taskPriority').value;

    const task = {
        id: taskId++,
        title,
        subject,
        dueDate,
        priority,
        completed: false,
        createdAt: new Date()
    };

    tasks.push(task);
    taskForm.reset();
    renderTasks();
    updateStats();
}

function renderTasks() {
    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <p>Nothing here yet! Add your first task to get started.</p>
            </div>
        `;
        return;
    }

    taskList.innerHTML = tasks.map(task => `
        <div class="task-item fade-in ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-content">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">
                    ${task.subject ? `${task.subject} • ` : ''}
                    ${task.dueDate ? `Due ${formatDate(task.dueDate)} • ` : ''}
                    ${task.priority === 'high' ? 'Urgent!' : task.priority === 'medium' ? 'Important' : 'Low priority'}
                </div>
            </div>
            <div class="task-actions">
                <button class="btn btn-small btn-complete" onclick="toggleTask(${task.id})">
                    ${task.completed ? 'Undo' : 'Done'}
                </button>
                <button class="btn btn-small btn-delete" onclick="deleteTask(${task.id})">
                    Remove
                </button>
            </div>
        </div>
    `).join('');
}

function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
    updateStats();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    updateStats();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
    completionRateEl.textContent = rate + '%';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
}

updateStats();