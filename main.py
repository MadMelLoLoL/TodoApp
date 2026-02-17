from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label

class MyApp(App):
    def build(self):
        layout = BoxLayout(orientation="vertical")

        label = Label(text="Hello")
        button = Button(text="Press")

        def clicked(instance):
            label.text = "Button Pressed!"

        button.bind(on_press=clicked)

        layout.add_widget(label)
        layout.add_widget(button)

        return layout

if __name__ == "__main__":
    MyApp().run()