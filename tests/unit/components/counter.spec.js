import { shallowMount } from "@vue/test-utils"
import Counter from "@/components/Counter.vue"

describe("Counter Component", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Counter)
  })

  /* test("Debe ser igual al snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot()
  }) */

  test("El título por defecto debe ser 'Counter'", () => {
    const title = wrapper.find("h2")
    expect(title.exists()).toBeTruthy()

    const value = title.text()
    expect(value).toBe("Counter")
  })

  test("El valor por defecto del contador debe ser '100'", () => {
    const counter = wrapper.find("[data-testid='counter']")
    expect(counter.exists()).toBeTruthy()

    const value = counter.text()
    expect(value).toBe("100")
  })

  test("Debe incrementar en 1 el valor del contador y luego decrementar en 2 el nuevo valor", async () => {
    const increase = wrapper.find("[data-testid='increase']")
    const decrease = wrapper.find("[data-testid='decrease']")
    const counter = wrapper.find("[data-testid='counter']")

    await increase.trigger("click")
    await decrease.trigger("click")
    await decrease.trigger("click")

    expect(counter.text()).toBe("99")
  })

  test("Debe establecer el valor por defecto", () => {
    const start = wrapper.props("start")
    const counter = wrapper.find("[data-testid='counter']")

    expect(Number(counter.text())).toBe(start)
  })

  test("Debe mostar la prop title", () => {
    const value = "Hello World"
    const wrapper = shallowMount(Counter, {
      props: {
        title: value,
      },
    })

    const title = wrapper.find("[data-testid='title']")

    expect(title.text()).toBe(value)
  })
})
