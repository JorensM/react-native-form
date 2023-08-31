import { ErrorMessage } from 'formik'
import { PropsWithChildren } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export type FieldBaseProps = {
    label: string
    name: string
}

export default function FieldBase( { 
    label,
    name,
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
            <ErrorMessage 
                component={Text} 
                style={styles.error} 
                name={name} 
            />
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
    },
    error: {
        fontSize: 14,
        color: 'red'
    }
})