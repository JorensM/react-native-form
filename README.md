# Creating Forms In React Native With Formik

## Introduction

Forms are an integral part of many mobile applications. Whether it's a sign-up/sign-in form, a 'create post' form or any other type of form, one thing is for sure - forms are important.

What is a form? You probably already know what a form is, but let me give you a definition anyway. In software, a form is a UI element that allows you to fill out data fields and then store this data or send this data to the software's servers. Forms allow the user to provide information to the app to create new content or to tailor the app experience to the user's preferences, among many other things.

Do you want to create a form in your React Native app but don't know how? Then this post is for you! In this post I will teach you how to create forms using a library called [Formik](https://formik.org) , as well as how to integrate non-native form components with Formik, while also keeping accessibility in mind. Additionally you will learn how to validate forms using [Yup](https://github.com/jquense/yup) (which Formik supports out of the box)

## Table of contents

  1. Introduction
  2. Setup
  3. Building the components
  4. Building the form
  5. Adding accessibility

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

### InputField

In the `components` folder, create a file called `TextField.tsx`:

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

If we added it to a Formik form though, at this point it wouldn't work - no data would be submitted. We have to integrate our component with Formik.