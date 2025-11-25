input.onButtonPressed(Button.A, function on_button_pressed_a() {
    get_stuff("weather")
})
function split_words_to_fit(in_words: string): string[] {
    let in_split = _py.py_string_split(in_words, " ")
    let out_words = []
    let temp = ""
    for (let word of in_split) {
        if (temp.length + word.length > 16) {
            out_words.push(temp)
            temp = word + " "
        } else {
            temp = temp + word + " "
        }
        
    }
    out_words.push(temp)
    //  append temp since string has ended
    return out_words
}

function get_stuff(mode: string) {
    if (mode == "weather") {
        serial.writeLine("weather")
    }
    
    if (mode == "news") {
        serial.writeLine("news")
    }
    
}

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    get_stuff("news")
})
let answer = ""
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.clear()
I2C_LCD1602.ShowString("Hello", 0, 0)
basic.pause(1000)
I2C_LCD1602.ShowString("This is your", 0, 0)
I2C_LCD1602.ShowString("Pi Brief", 0, 1)
basic.pause(5000)
I2C_LCD1602.clear()
I2C_LCD1602.ShowString("Waiting for Pi", 0, 0)
I2C_LCD1602.ShowString("connection...", 0, 1)
serial.setRxBufferSize(64)
serial.setTxBufferSize(64)
basic.forever(function render_stuff() {
    let split_words: string[];
    
    answer = serial.readLine()
    I2C_LCD1602.clear()
    let answer_split = _py.py_string_split(answer, ";")
    if (answer_split[0] == "weather") {
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString(answer_split[1], 0, 0)
        I2C_LCD1602.ShowString(answer_split[2], 0, 1)
    }
    
    if (answer_split[0] == "news") {
        try {
            split_words = split_words_to_fit(answer_split[1])
            basic.showString(split_words[0])
            I2C_LCD1602.ShowString(split_words[0], 0, 0)
            if (split_words.length == 2) {
                I2C_LCD1602.ShowString(split_words[1], 0, 1)
            }
            
        }
        catch (_) {
            basic.showString("ERROR! ERROR! ERROR! ERROR!")
            control.reset()
        }
        
    }
    
})
