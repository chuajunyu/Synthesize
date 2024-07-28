export interface User {
    email: string;
    displayName: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
}


export interface Suggestion {
    ACTIONABLE: string;
    LINKED_RESPONSES: string[];
    RATIONALE: string;
    lastUpdated: number;
    open: boolean;
    viewed: boolean;
}

export interface Question {
    text: string;
}
export interface Form {
    title: string;
    description: string;
    questions: Question[];
    createdDate: number;
    creatorId: string;
}