import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { EndScreenComponent } from "./modals/end-screen/end-screen.component"
import { InstructionsComponent } from "./modals/instructions/instructions.component"
import { Post } from "./post"
import entries from "../assets/entries.json";

export const sortArray = function(e: Post[]) {
    e.sort((a, b) => (a.order < b.order) ? 1 : -1)
    console.log("Sorted E")
    console.log(e)
    return e
}

export const openEndScreen = function(check: boolean, modalService: NgbModal, post: Post[], answer: Post, mode: string) {
    console.log("hello world")
    const modalRef = modalService.open(EndScreenComponent, {
      size: 'l',
      centered: true,
      windowClass: 'dark-modal'
    });
    modalRef.componentInstance.guesses = post;
    modalRef.componentInstance.won = check;
    modalRef.componentInstance.answer = answer;
    modalRef.componentInstance.mode = mode;
}

export const openInstructions = function(modalService: any) {
    console.log("hello world")
    modalService.open(InstructionsComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'dark-modal'
    });
}

export const getDailyAnswer = function() {
    const now = Date.now()
    const today = Math.floor(now / 86400000)
    return entries.entries[today % entries.entries.length]
}