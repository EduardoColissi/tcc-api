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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PomodoroController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const create_focus_event_dto_1 = require("./dto/create-focus-event.dto");
const create_session_dto_1 = require("./dto/create-session.dto");
const end_session_dto_1 = require("./dto/end-session.dto");
const pomodoro_service_1 = require("./pomodoro.service");
let PomodoroController = class PomodoroController {
    pomodoro;
    constructor(pomodoro) {
        this.pomodoro = pomodoro;
    }
    createSession(user, dto) {
        return this.pomodoro.createSession(user.id, dto);
    }
    endSession(user, id, dto) {
        return this.pomodoro.endSession(user.id, id, dto);
    }
    getActiveSession(user) {
        return this.pomodoro.getActiveSession(user.id);
    }
    getSessions(user, taskId) {
        return this.pomodoro.getSessions(user.id, taskId);
    }
    getStats(user, taskId) {
        return this.pomodoro.getStats(user.id, taskId);
    }
    getFocusHistory(user) {
        return this.pomodoro.getFocusHistory(user.id);
    }
    logFocusEvents(user, id, dto) {
        return this.pomodoro.logFocusEvents(user.id, id, dto);
    }
    getFocusSummary(user, id) {
        return this.pomodoro.getSessionFocusSummary(user.id, id);
    }
};
exports.PomodoroController = PomodoroController;
__decorate([
    (0, common_1.Post)('sessions'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_session_dto_1.CreateSessionDto]),
    __metadata("design:returntype", void 0)
], PomodoroController.prototype, "createSession", null);
__decorate([
    (0, common_1.Put)('sessions/:id/end'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, end_session_dto_1.EndSessionDto]),
    __metadata("design:returntype", void 0)
], PomodoroController.prototype, "endSession", null);
__decorate([
    (0, common_1.Get)('sessions/active'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PomodoroController.prototype, "getActiveSession", null);
__decorate([
    (0, common_1.Get)('sessions'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('taskId', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PomodoroController.prototype, "getSessions", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('taskId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PomodoroController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PomodoroController.prototype, "getFocusHistory", null);
__decorate([
    (0, common_1.Post)('sessions/:id/focus-events'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, create_focus_event_dto_1.CreateFocusEventsDto]),
    __metadata("design:returntype", void 0)
], PomodoroController.prototype, "logFocusEvents", null);
__decorate([
    (0, common_1.Get)('sessions/:id/focus-summary'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PomodoroController.prototype, "getFocusSummary", null);
exports.PomodoroController = PomodoroController = __decorate([
    (0, common_1.Controller)('pomodoro'),
    __metadata("design:paramtypes", [pomodoro_service_1.PomodoroService])
], PomodoroController);
//# sourceMappingURL=pomodoro.controller.js.map