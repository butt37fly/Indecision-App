import { shallowMount } from "@vue/test-utils"
import Indecision from "@/components/Indecision.vue"

describe("Indecision Component", () => {
  let wrapper
  let consoleSpy

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: "yes",
          forced: false,
          image: "https://yesno.wtf/assets/yes/2.gif",
        }),
    })
  )

  beforeEach(() => {
    wrapper = shallowMount(Indecision)
    consoleSpy = jest.spyOn(console, "log")
  })

  test("Debe hacer match con el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test("Escribir en el input no debe inicializar la petición", async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer")
    const input = wrapper.find("[data-testid='input']")

    await input.setValue("Hello World")

    expect(getAnswerSpy).not.toHaveBeenCalled()
  })

  test("Escribir el ? debe inicializar una petición a la API", async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer")
    const input = wrapper.find("[data-testid='input']")

    await input.setValue("Some question?")

    expect(getAnswerSpy).toHaveBeenCalled()
  })

  test("Pruebas en getAnswer()", async () => {
    await wrapper.vm.getAnswer()

    expect(wrapper.vm.img).not.toBeNull()
    expect(wrapper.vm.answer).not.toBeNull()
  })

  test("Fallo en el API", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"))

    await wrapper.vm.getAnswer()

    expect(wrapper.vm.img).toBeNull()
    expect(wrapper.vm.answer).toBe("Ha ocurrido un error")
  })
})
