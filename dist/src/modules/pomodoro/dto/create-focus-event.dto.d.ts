export declare enum FocusEventTypeDto {
    PERSON_ABSENT = "PERSON_ABSENT",
    CELL_PHONE = "CELL_PHONE",
    MULTIPLE_PEOPLE = "MULTIPLE_PEOPLE",
    HEAD_TURNED = "HEAD_TURNED",
    LOOKING_DOWN = "LOOKING_DOWN",
    EYES_CLOSED = "EYES_CLOSED"
}
export declare class FocusEventItemDto {
    type: FocusEventTypeDto;
    startedAt: string;
    endedAt?: string;
    durationMs?: number;
}
export declare class CreateFocusEventsDto {
    events: FocusEventItemDto[];
}
