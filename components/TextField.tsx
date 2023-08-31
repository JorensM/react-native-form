import { useField } from 'formik';
import { TextInput, StyleSheet } from 'react-native'
import FieldBase, { FieldBaseProps} from './FieldBase';

type TextFieldProps = FieldBaseProps & {
    name: string
}

export default function TextField({ 
    label,
    name
}: TextFieldProps) {

    const [ value, meta, helpers ] = useField(name)

    const handleChange = (new_text: string) => {
        helpers.setValue(new_text)
    }

    return (
        <FieldBase
            label={label}
            name={name}
        >
            <TextInput
                style={styles.input}
                onChangeText={handleChange}
                value={meta.value}
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