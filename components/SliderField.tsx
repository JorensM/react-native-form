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

    const handleChange = (new_value: number[]) => {
        helpers.setValue(new_value[0])
    }

    return (
        <FieldBase
            label={label}
            name={name}
        >
            <Slider
                minimumValue={0}
                maximumValue={100}
                step={1}
                containerStyle={styles.slider}
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