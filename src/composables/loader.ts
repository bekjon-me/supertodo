export const useLoader = () => {
    const showLoader = ref(false);

    const toggleLoader = () => {
        showLoader.value = !showLoader.value;
    };

    return {
        showLoader,
        toggleLoader,
    };
};
