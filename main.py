def render_stuff():
    global answer
    answer = serial.read_line()
    I2C_LCD1602.clear()
    answer_split = answer.split("!@;")
    if answer_split[0] == "weather":
        I2C_LCD1602.clear()
        I2C_LCD1602.show_string(answer_split[1], 0, 0)
        I2C_LCD1602.show_string(answer_split[2], 0, 1)
    if answer_split[0] == "news":
        try:
            split_words = split_words_to_fit(answer_split[1])
            I2C_LCD1602.show_string(split_words[0], 0, 0)
            if len(split_words) >= 2:
                I2C_LCD1602.show_string(split_words[1], 0, 1)
            if len(split_words) == 3:
                pass
        except:
            basic.showString("ERROR! ERROR! ERROR! ERROR!")
            control.reset()

def on_button_pressed_a():
    get_stuff("weather")
input.on_button_pressed(Button.A, on_button_pressed_a)


def get_stuff(mode: str):
    if mode == "weather":
        serial.write_line("weather")
    if mode == "news":
        serial.write_line("news")

def on_button_pressed_b():
    get_stuff("news")
input.on_button_pressed(Button.B, on_button_pressed_b)

answer = ""
I2C_LCD1602.lcd_init(39)
I2C_LCD1602.clear()
serial.set_rx_buffer_size(128)
serial.set_tx_buffer_size(128)
basic.forever(render_stuff)