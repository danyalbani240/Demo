export const useLoader = () => {
  const visible = useState("global-loader", () => true);

  const show = () => {
    visible.value = true;
  };

  const hide = () => {
    visible.value = false;
  };

  return {
    visible,
    show,
    hide,
  };
};
