import FormBuilder from "@/components/FormBuilder";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function App() {
    return (
        <ProtectedRoute>
            <div>
                <FormBuilder />
            </div>
        </ProtectedRoute>
    );
}