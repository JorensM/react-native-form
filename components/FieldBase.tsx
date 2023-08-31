import { PropsWithChildren } from 'react'
import { StyleSheet, View, Text } from 'react-native'

type FieldBaseProps = {
    label: string,
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