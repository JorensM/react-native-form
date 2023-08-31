import { PropsWithChildren } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export type FieldBaseProps = {
    label: string
}

export default function FieldBase( { 
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