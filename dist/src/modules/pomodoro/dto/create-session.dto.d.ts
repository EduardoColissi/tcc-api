export declare enum SessionTypeDto {
    FOCUS = "FOCUS",
    BREAK = "BREAK"
}
export declare class CreateSessionDto {
    taskId: number;
    type: SessionTypeDto;
    cycleNumber: number;
    monitoringEnabled?: boolean;
}
