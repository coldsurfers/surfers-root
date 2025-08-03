// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function runSequentially(tasks: (() => Promise<any>)[]) {
  return tasks.reduce((prevPromise, task) => {
    return prevPromise.then(() => task().then(console.log));
  }, Promise.resolve());
}
