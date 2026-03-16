import {
    useAppDispatch,
    useAppSelector,
} from 'src/globals/store/redux/reduxHooks'
import { sampleAction } from 'src/features/sample/sampleReducer'

export function SampleTwo() {
    const value = useAppSelector((state) => state.sampleReducer.value)
    const dispatch = useAppDispatch()

    return (
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
            <p className="mb-2 text-sm text-amber-700">
                샘플 버전 2 (곱셈/나눗셈)
            </p>
            <p className="mb-2 font-medium">값: {value}</p>
            <div className="flex gap-2">
                <button
                    type="button"
                    className="rounded bg-amber-500 px-3 py-1 text-white"
                    onClick={() => dispatch(sampleAction.multiply())}
                >
                    x2
                </button>
                <button
                    type="button"
                    className="rounded bg-gray-500 px-3 py-1 text-white"
                    onClick={() => dispatch(sampleAction.divide())}
                >
                    /2
                </button>
            </div>
        </div>
    )
}
