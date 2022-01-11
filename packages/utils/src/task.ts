import type { TaskFunction } from 'gulp';

export const addDisplayNameToTask = (
  displayName: string,
  task: TaskFunction,
): TaskFunction => (Object.assign(task, { displayName }));
