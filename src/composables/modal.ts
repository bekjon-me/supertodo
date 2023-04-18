export const useModal = () => {
    const showModal = ref(false);

    const toggleModal = () => {
        showModal.value = !showModal.value;
    };

    return {
        showModal,
        toggleModal,
    };
};
