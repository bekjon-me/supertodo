export const useModal = () => {

  const showModal = ref(false);

  const toggleModal = () => {
    console.log('toggleModal');
    showModal.value = !showModal.value;
  }

  return {
    showModal,
    toggleModal
  }

}