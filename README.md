# Creating Forms In React Native With Formik

## Introduction

Forms are an integral part of many mobile applications. Whether it's a sign-up/sign-in form, a 'create post' form or any other type of form, one thing is for sure - forms are important.

What is a form? You probably already know what a form is, but let me give you a definition anyway. In software, a form is a UI element that allows you to fill out data fields and then store this data or send this data to the software's servers. Forms allow the user to provide information to the app to create new content or to tailor the app experience to the user's preferences, among many other things.

Do you want to create a form in your React Native app but don't know how? Then this post is for you! In this post I will teach you how to create forms using a library called [Formik](https://formik.org) , as well as how to integrate non-native form components with Formik. Additionally you will learn how to validate forms using [Yup](https://github.com/jquense/yup) (which Formik supports out of the box)

## Table of contents

  1. Introduction
  2. Setup
  3. Building the components
  4. Building the form
  5. Adding validation
  6. Improving our code - pass props down

[Source code for this project](https://github.com/JorensM/react-native-form)

## Setup

Before we begin working on our project, we must set it up and install all the necessary dependencies. We will be using [Expo](https://docs.expo.dev/) for this project. Expo is a React Native management tool that handles a lot of heavy stuff for us, such as efficiently compiling code and assets, as well as provides us with a productive development environment. Also we will be using Typescript for this project, but don't worry, the process is practically identical to Javascript, so if you don't know Typescript that's fine. This article assumes some basic understanding of [React](https://react.dev/) and [React Native](https://reactnative.dev/) , such as components, hooks and state. You must also have Node.js installed on your computer.

First things first, let's set up our Expo project. Navigate to the directory where you want your project folder to reside, and run the following command:

    npx create-expo-app -t expo-template-blank-typescript

This will set up a fresh expo app with a TypeScript template.

You may be prompted to install a package, in which case just press enter to confirm its installation. After that, you will be prompted to name your project. You can name it any way you want - I named mine `react-native-form`

To test that our app works, run `npm run web` or `npm run android` or `npm run ios`.If you're testing on mobile, make sure to have a device connected. If you're testing on web, you will
get an error asking you to install necessary dependencies for web, so go ahead and install them and run the command again.

Next up, let's install all the necessary dependencies. We will need Formik for form handling, Yup for form validation, [react-native-element-dropdown](https://www.npmjs.com/package/react-native-element-dropdown) for our dropdown component and [react-native-slider](https://github.com/miblanchard/react-native-slider) for our slider component. We don't need any libraries for text input because text input is natively supported by React Native.

To install the aforementioned packages, run the following command:

    npm i react-native-element-dropdown formik yup @miblanchard/react-native-slider`

Now we're ready to start coding!

## Building the components

We will create 4 components for the form: `FieldBase`, `SliderField`, `TextField`, `DropdownField`. The latter 3 will extend from first one, so let's start with it!

### FieldBase

The `FieldBase` component will be used to reuse parts that are common across all field components, such as the label or the field layout.

First, create a `components` folder at the root of your project. In this directory we will hold all of our components.

Next, in the newly created folder, create a file `FieldBase.tsx`, or `FieldBase.jsx` if you're using plain Javascript (from now on assume that all `.tsx` files should be `.jsx` if you're using JS):

`FieldBase.tsx` :

    import { PropsWithChildren } from 'react'
    import { View } from 'react-native'

    export type FieldBaseProps = {
        label: string
    }

    export default function FieldBase({ 
        label,
        children
    }: PropsWithChildren<FieldBaseProps>) {
        return (
            <View>
                { children }
            </View>
        )
    }

This is the basic `FieldBase` component. Currently all it can do is act as a wrapper for its children `PropsWithChildren` is a function that allows you to use the `children` prop in your component (you don't need this if you're using Javascript). The function accepts a [generic](https://www.typescriptlang.org/docs/handbook/2/generics.html) that should be the type of your props.

You may have noticed that we're also exporting `FieldBaseProps`. This is so that we can reuse this type in our other components.

Next, let's add some styles and have our component show a label.

`FieldBase.tsx` :

    import { PropsWithChildren } from 'react'
    import { StyleSheet, View, Text } from 'react-native'

    export type FieldBaseProps = {
        label: string
    }

    export default function FieldBase({ 
        label,
        children
    }: PropsWithChildren<FieldBaseProps>) {
        return (
            <View
                style={ styles.container }
            >
                <Text
                    style={ styles.label }
                >
                    { label }
                </Text>
                { children }
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column'
        },
        label: {
            fontSize: 14,
            color: '#a8a8a8'
        }
    })

As you can see we have added some styles to the component using the `StyleSheet.create()` function. Learn more about [StyleSheet](https://reactnative.dev/docs/stylesheet). Additionally we have added a `Text` component for our label.

At this point, if you use this component somewhere in your app's code, like so:

    <FieldBase
        label='My field'
      >
        <Text>Field input will be here</Text>
    </FieldBase>

You should see something like this:

![](images/field-base-1.png)

Awesome! So this will be the base of our fields that we will extend from. The purpose and advantage of creating such a 'base' component is that you can reuse code and avoid duplicating code.

Next up is `TextField`.

### TextField

In the `components` folder, create a file called `TextField.tsx`:

`TextField.tsx` :

    import FieldBase, { FieldBaseProps} from './FieldBase';

    type TextFieldProps = FieldBaseProps & {
        name: string
    }

    export default function TextField({ 
        name, 
        label 
    }: TextFieldProps) {
        return (
            <FieldBase
                name={name}
                label={label}
            >

            </FieldBase>
        )
    }

As you can see we've used the `FieldBase` in our new component. This allows us to specify a label and show it without needing to rewrite the code for it. Right now the component can't do anything, so let's go ahead and introduce a `TextInput` component to it!

`TextField.tsx` :

    import { TextInput, StyleSheet } from 'react-native'
    import FieldBase, { FieldBaseProps} from './FieldBase';

    type TextFieldProps = FieldBaseProps & {
        name: string
    }

    export default function TextField({
        name,
        label,
    }: TextFieldFieldProps) {
        return (
            <FieldBase
                label={label}
            >
                <TextInput
                    style={styles.input}
                />
            </FieldBase>
        )
    }

    const styles = StyleSheet.create({
        input: {
            height: 32,
            width: 200,
            borderWidth: 1,
            borderColor: '#a8a8a8'
        }
    })

As you can see we've added a new component - `TextInput` - [TextInput](https://reactnative.dev/docs/textinput) is a native React Native component. Also we have applied some basic style to the input.

So far so good!

Right now if we added the `TextField` to our app, it would look like this: 

![](/images/text-field-1.PNG)

You can try entering some text into it to see that it works!

If we added it to a Formik form though, at this point it wouldn't work - no data would be submitted. We have to integrate our component with Formik, like so:.

`TextField.tsx` :

    import { useField } from 'formik';

    /* ... */

    const [ value, meta, helpers ] = useField(name)

    const handleChange = (new_text: string) => {
        helpers.setValue(new_text)
    }

    return (
        <FieldBase
            label={label}
        >
            <TextInput
                style={styles.input}
                onChangeText={handleChange}
                value={meta.value}
            />
        </FieldBase>
    )

    /* ... */

What we have done is made this component work with a Formik form. We did this by making the `onChangeText` handler update the input value stored in the Formik form.
Now, if we added it to a form, entered a value and hit submit, the values would be passed to the Formik's `onSubmit` prop.

Right now if we tried to use this component in our app, we would receive an error, because now the component expects to reside in a Formik form (which we are yet to build). But before we build our form, let's build the other 2 field components - `DropdownField` and `SliderField`

### DropdownField

Now let's create a dropdown field component. For this component we will use the library *react-native-element-dropdown* that we installed in the Setup chapter.

In the `components` folder, create a new file `DropdownField.tsx`:

`DropdownField.tsx` :

    import { useField } from 'formik';
    import { Dropdown } from 'react-native-element-dropdown';
    import { StyleSheet } from 'react-native'
    import FieldBase, { FieldBaseProps} from './FieldBase';

    type DropdownFieldProps = FieldBaseProps & {
        name: string
        data: {label: string, value: string}[]
    }

    export default function DropdownField({ 
        label,
        name,
        data,
    }: DropdownFieldProps) {

        const [ value, meta, helpers ] = useField(name)

        const handleChange = (new_value: string) => {
            helpers.setValue(new_value)
        }

        return (
            <FieldBase
                label={label}
            >
                <Dropdown
                    style={styles.dropdown}
                    data={data}
                    labelField='label'
                    valueField='value'
                    value={meta.value}
                    onChange={(data) => handleChange(data.value)}
                />
            </FieldBase>
        )
    }

    const styles = StyleSheet.create({
        dropdown: {
            height: 32,
            width: 200,
            borderWidth: 1,
            borderColor: '#a8a8a8',
            paddingLeft: 4
        }
    })

As you can see the process is practically identical with the previous component - simply make the Formik's saved value update whenever the input's value changes. We have also applied some styles to our dropdown. We also pass a `data` some prop down to the `Dropdown` component, so that the component can show the options


If we tried rendering this component, we'd again get an error because we haven't created a form for it yet. Bear with me, we're almost there!

### SliderField

Finally let's create a `SliderField` component that will allow the user to input a value with a slider.

In the `components` folder, create a file `SliderField.tsx`:

`SliderField.tsx` :

    import { useField } from 'formik';
    import { StyleSheet } from 'react-native'
    import FieldBase, { FieldBaseProps} from './FieldBase';
    import { Slider } from '@miblanchard/react-native-slider'

    type SliderFieldProps = FieldBaseProps & {
        name: string
    }

    export default function SliderField({ 
        label,
        name
    }: SliderFieldProps) {

        const [ value, meta, helpers ] = useField(name)

        const handleChange = (new_value: number | number[]) => {
            helpers.setValue(new_value)
        }

        return (
            <FieldBase
                label={label}
            >
                <Slider
                    containerStyle={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={meta.value}
                    onSlidingComplete={handleChange}
                />
            </FieldBase>
        )
    }

    const styles = StyleSheet.create({
        slider: {
            height: 24,
            width: 200,
        }
    })

As you can see once again, the process is nearly identical - just update Formik's value when the input's value changes.

You may have noticed that I have the types `number | number[]` for the `handleChange()` function. This is because the slider component can return a single number and also an array of numbers if you're using the range feature(we're not using it but we still have to specify the type)

Okay, now that we've created our components, let's create a Formik form and hook them up!

## Building the form

To build our form, we will use Formik's `<Formik/>` and `<Form/>` components. First of all, let's add a foundation to our App component in `App.tsx`

`App.tsx` :

    import { View, StyleSheet } from 'react-native'

    export default function App() {

        return (
            <View style={styles.container}>
            
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            padding: 16
        },
    });

Nothing much to see yet.

Now, let's define our form's initial values

`App.tsx` :

    /* ... */

    type FormValues = {
        username: string,
        profession: 'developer' | 'cook' | 'writer',
        coolness: number
    }

    export default function App() {

        const initialValues: FormValues = {
            username: '',
            profession: 'developer',
            coolness: 50
        }

        /* ... */
}

These will be the default values that will be set on the fields when the form loads/reloads. You can specify other values or even properties.

Now let's add the `Formik` and `Form` components to the app:

`App.tsx` :

    import { View, StyleSheet } from 'react-native'
    import { Formik, Form } from 'formik'; // +

    /* ... */

    export default function App() {

        /* ... */

        return (
            <View style={styles.container}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={console.log}
                >
                    <Form>

                    </Form>
                </Formik>
            </View>
        );
        /* ... */

We have created our Formik component, which accepts an `initialValues` prop, which we specify as the `initialValues` variable that we created before. Additionally `Formik` accepts an `onSubmit` prop, which specifies which function to run when the form is submitted. We have made it so that the submitted values simply get logged into the console on submit.

Now let's add our fields to the form.

`App.tsx` :

    import { View, StyleSheet, Pressable, Text } from 'react-native'
    import { Formik, Form } from 'formik';
    import TextField from './components/TextField';
    import DropdownField from './components/DropdownField';
    import SliderField from './components/SliderField';

    /* ... */

    export default function App() {

    /* ... */

    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={console.log}
            >
                {formik => (
                    <Form
                        style={styles.form}
                    >
                        <TextField
                            label='username'
                            name='username'
                        />
                        <DropdownField
                            label='profession'
                            name='profession'
                            data={[
                                {
                                    label: 'Developer',
                                    value: 'developer'
                                },
                                {
                                    label: 'Cook',
                                    value: 'cook'
                                },
                                {
                                    label: 'Writer',
                                    value: 'writer'
                                }
                            ]}
                        />
                        <SliderField
                            label='How cool are you?'
                            name='coolness'
                        />
                        <Pressable
                            style={styles.submit_button}
                            onPress={() => formik.submitForm()}
                        >
                            <Text>Submit</Text>
                        </Pressable>
                    </Form>
                )}
            </Formik>
        </View>
    );
    
    /* ... */

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            padding: 16
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: 16
        },
        submit_button: {
            borderWidth: 1,
            borderColor: 'blue',
            width: 104,
            alignItems: 'center',
            padding: 8
        }
    });

Alright, we've added our fields to our form. We've also added a submit button and some style for the form and the button. If you try to submit the form, you will see the values logged to the console. Hooray! We've made our form!

![](/images/form-1.PNG)

![](/images/form-log.PNG)

## Adding validation

The next step is to add validation to our fields. We will do this by using the library Yup, which Formik supports out of the box.

First of all let's add an `ErrorMessage` component to our `FieldBase`. We will also need to add a `name` prop to our `FieldBase` that we can pass to the `ErrorMessage` so it know which field's error to display.

`FieldBase.tsx` :

    import { ErrorMessage } from 'formik' // +
    import { PropsWithChildren } from 'react'
    import { StyleSheet, View, Text } from 'react-native'

    export type FieldBaseProps = {
        label: string
        name: string // +
    }

    export default function FieldBase( { 
        label,
        name, // +
        children
    }: PropsWithChildren<FieldBaseProps>) {
        return (
            <View
                style={ styles.container }
            >
                <Text
                    style={ styles.label }
                >
                    { label }
                </Text>
                { children }
                <ErrorMessage            // +
                    component={Text}     // +
                    style={styles.error} // +
                    name={name}          // +
                />                       // +
            </View>
        )
    }

    const styles = StyleSheet.create({
        /* ... */
        error: {          // +
            fontSize: 14, // +
            color: 'red'  // +
        }                 // +
    })

    /* ... */

Next we have to update our `TextField`, `SliderField` and `DropdownField` to pass the `name` prop down to `FieldBase`, like so:

`TextField.tsx` :

export default function TextField({ 
    label,
    name
}: TextFieldProps) {

    /* ... */

    return (
        <FieldBase
            label={label}
            name={name} // +
        >
    /* ... */

The code above shows how to do it for `TextField`, but it's the same process for `SliderField` and `DropdownField`

Now we have to add the validation schema to our Formik form:

`App.tsx` :

    import { View, StyleSheet, Pressable, Text } from 'react-native'
    import { Formik, Form } from 'formik';
    import * as Yup from 'yup';
    import TextField from './components/TextField';
    import DropdownField from './components/DropdownField';
    import SliderField from './components/SliderField';

    /* ... */

    const validationSchema = Yup.object().shape({  // +
        username: Yup.string()                     // +
            .min(2, 'Too short!')                  // +
            .max(16, 'Too long!')                  // +
            .required('Required'),                 // +
        profession: Yup.string()                   // +
            .oneOf(['developer', 'cook', 'writer'], 'Invalid value')                                // +
            .required('Required!'),                // +
        coolness: Yup.number()                     // +
            .min(0, 'Value must be between 0 and 100')// +
            .max(100, 'Value must be between 0 and 100')// +
            .required('Required!')// +
    })

    return (
        <View style={styles.container}>
        <Formik
            initialValues={initialValues}
            onSubmit={console.log}
            validationSchema={validationSchema} // +
        >
    /* ... */

Yay! We added validation to our form! Now try submitting the form with an empty username and you should see an error message pop up.

![](/images/validation.PNG)

And we're done with our Formik form!

## Conclusion
I hope you learned something new from this post. If you have any questions or comments feel free to leave them here, on the project repo or by emailing me at [jorensmerenjanu@gmail.com](mailto:jorensmerenjanu@gmail.com)