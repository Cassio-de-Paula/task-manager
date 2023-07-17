export default function dateFormat(deadline) {
  const data = new Date(deadline);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const newDeadline = data.toLocaleDateString(undefined, options);

  return newDeadline;
}
