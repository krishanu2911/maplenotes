const labelFilter = (state, data) => {
    return state.labels.length === 0
      ? data
      : data.filter((product) => state.labels.includes(product.label));
  };
  
  const priorityFilter = (state, data) => {
    switch (state.sortByPriority) {
      case "High":
        return data.filter((item) => item.priority === "High");
      case "Medium":
        return data.filter((item) => item.priority === "Medium");
      case "Low":
        return data.filter((item) => item.priority === "Low");
      default:
        return data;
    }
  };
  
  const dateFilter = (state, data) => {
    switch (state.sortByDate) {
      case "Oldest":
        return [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
      case "Newest":
        return [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
      default:
        return data;
    }
  };
  const Compose =
    (state, ...functions) =>
    (data) => {
      return functions.reduce((acc, curr) => {
        return curr(state, acc);
      }, data);
    };
  
  export { labelFilter, priorityFilter, dateFilter, Compose };