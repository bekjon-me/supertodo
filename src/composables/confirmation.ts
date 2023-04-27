export const useConfirmation = () => {
    const showConfirmation = ref(false);

    const toggleConfirmation = () => {
        showConfirmation.value = !showConfirmation.value;
    };

    return {
        showConfirmation,
        toggleConfirmation,
    };
};
