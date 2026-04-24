"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFocusEventsDto = exports.FocusEventItemDto = exports.FocusEventTypeDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var FocusEventTypeDto;
(function (FocusEventTypeDto) {
    FocusEventTypeDto["PERSON_ABSENT"] = "PERSON_ABSENT";
    FocusEventTypeDto["CELL_PHONE"] = "CELL_PHONE";
    FocusEventTypeDto["MULTIPLE_PEOPLE"] = "MULTIPLE_PEOPLE";
    FocusEventTypeDto["HEAD_TURNED"] = "HEAD_TURNED";
    FocusEventTypeDto["LOOKING_DOWN"] = "LOOKING_DOWN";
    FocusEventTypeDto["EYES_CLOSED"] = "EYES_CLOSED";
})(FocusEventTypeDto || (exports.FocusEventTypeDto = FocusEventTypeDto = {}));
class FocusEventItemDto {
    type;
    startedAt;
    endedAt;
    durationMs;
}
exports.FocusEventItemDto = FocusEventItemDto;
__decorate([
    (0, class_validator_1.IsEnum)(FocusEventTypeDto),
    __metadata("design:type", String)
], FocusEventItemDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], FocusEventItemDto.prototype, "startedAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], FocusEventItemDto.prototype, "endedAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], FocusEventItemDto.prototype, "durationMs", void 0);
class CreateFocusEventsDto {
    events;
}
exports.CreateFocusEventsDto = CreateFocusEventsDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(200),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FocusEventItemDto),
    __metadata("design:type", Array)
], CreateFocusEventsDto.prototype, "events", void 0);
//# sourceMappingURL=create-focus-event.dto.js.map