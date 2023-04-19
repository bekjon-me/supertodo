export const useConfirmation = () => {
    const showConfirmation = ref(false);

    const toggleConfirmation = () => {
        console.log("toggle conf");
        
        showConfirmation.value = !showConfirmation.value;
    };

    return {
        showConfirmation,
        toggleConfirmation,
    };
};
