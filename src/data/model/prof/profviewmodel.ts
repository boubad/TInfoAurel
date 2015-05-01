//profviewmodel.ts
//
import {IBaseItem, IPerson,IDepartementPerson,IEtudAffectationItem} from '../../../infodata.d';
//
import {GroupeEvent} from '../../domain/groupeevent';
import {EtudEvent} from '../../domain/etudevent';
import {EtudAffectation} from '../../domain/etudaffectation';
import {WorkViewModel} from '../workviewmodel';
import {InfoRoot} from '../../inforoot';
//
export class ProfBaseViewModel extends WorkViewModel {
    public current_affectation: IBaseItem;
    protected _affs:IBaseItem[];
    public _genre:string;
    protected _startDate: Date;
    protected _endDate: Date;
    public groupeevents:GroupeEvent[];
    private _current_groupeevent:GroupeEvent;
    private modelGroupeEvent:GroupeEvent;
    public notes:EtudEvent[];
    public otherEvents:EtudEvent[];
    public displayMode:boolean;
    public eventMode:boolean;
    public noteMode:boolean;
    public attachmentMode:boolean;
    private _current_evt:EtudEvent;
    public etudAffectations:IEtudAffectationItem[];
    public currentEtudAffectations:IEtudAffectationItem[];
    //
    constructor() {
        super();
        this._affs = [];
        this.current_affectation = null;
        this._genre = null;
        this._startDate = null;
        this._endDate = null;
        this.groupeevents = [];
        this._current_groupeevent = null;
        this.modelGroupeEvent = new GroupeEvent();
        this.notes = [];
        this.otherEvents = [];
        this.displayMode = true;
        this.eventMode = false;
        this.noteMode = false;
        this.attachmentMode = false;
        this._current_evt = null;
        this.etudAffectations = [];
        this.currentEtudAffectations = [];
    }// constructor
    public activate(params?:any,queryString?:any,routeConfig?:any) : any{
        this.displayMode = true;
        this.eventMode = false;
        this.noteMode = false;
        this.attachmentMode = false;
        let self = this;
        this.modelGroupeEvent = new GroupeEvent()
        return super.activate(params,queryString,routeConfig).then((r)=>{
                return self.refresh_affectations();
            });
        }// activate
    protected create_etudEvent(): EtudEvent{
        return new EtudEvent({
            departementid:this.departementid,
            anneeid: this.anneeid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
            groupeeventid: this.groupeeventid
            });
    }
    public get currentEvent():EtudEvent{
        if (this._current_evt === null){
            this._current_evt = this.create_etudEvent();
        }
        return this._current_evt;
    }
    public set currentEvent(s:EtudEvent){
        this._current_evt = ((s !== undefined) && (s !== null)) ? s:
        this.create_etudEvent();
    }
    public setDisplayMode() : void {
        this.displayMode = true;
        this.eventMode = false;
        this.noteMode = false;
        this.attachmentMode = false;
    }
    public setEventMode() : void {
        this.displayMode = false;
        this.eventMode = true;
        this.noteMode = false;
        this.attachmentMode = false;
    }
    public setNoteMode() : void {
        this.displayMode = false;
        this.eventMode = false;
        this.noteMode = true;
        this.attachmentMode = false;
    }
    public setAttachmentMode() : void {
        this.displayMode = false;
        this.eventMode = false;
        this.noteMode = false;
        this.attachmentMode = true;
    }
    public get canAddGroupeEvent(): boolean {
        let x = this.current_affectation;
        return (x !== null) && (x.id !== null);
    }
    public set canAddGroupeEvent(s:boolean){}
    public get canRemoveGroupeEvent():boolean {
        let x = this.groupeEvent;
        return (x !== null) && (x.id !== null) && (x.rev !== null);
    }
    public set canRemoveGroupeEvent(s:boolean){}
    public get canSaveGroupeEvent():boolean {
        let x = this.groupeEvent;
        return (x !== null) && x.is_storeable();
    }
    public set canSaveGroupeEvent(s:boolean){}
    public removeGroupeEvent(): any {
        let x = this.groupeEvent;
        if (x === null){
            return Promise.resolve(false);
        }
        if ((x.id === null) || (x.rev === null)){
            return Promise.resolve(false);
        }
        if (!InfoRoot.confirm('Voulez-vous vraiment supprimer ' + x.id + '?')){
            return Promise.resolve(false);
        }
        let self = this;
        let service = this.dataService;
        let model = new EtudEvent({groupeeventid: x.id});
        let start = model.start_key;
        let end = model.end_key;
        this.clear_error();
        return service.remove_all_items(start,end).then((r)=>{
             return service.remove_item(x);
            }).then((x)=>{
                self._current_groupeevent = null;
                self.refresh_groupeevents();
            }).catch((err)=>{
                    self.set_error(err);
                });
        }// removeGroupeEvent
    public saveGroupeEvent() :any {
        let x = this.groupeEvent;
        if (x === null){
            return;
        }
        if (!x.is_storeable()){
            return;
        }
        if (x.id === null){
            x.id = x.create_id();
        }
        let self = this;
        return this.dataService.maintains_workitem(x).then((r)=>{
            self.refresh_groupeevents();
            },
            (err)=>{
                self.set_error(err);
                });
    }// saveGroupeEvent
    public get coefficient():string {
        let x = this.groupeEvent;
        let d = (x !== null) ? x.coefficient : null;
        return (d !== null) ? d.toString() : null;
    }
    public set coefficient(s:string){
        let x = this.groupeEvent;
        if (x !== null){
            let d = InfoRoot.string_to_number(s);
            if ((d !== null) && (d > 0)){
                x.coefficient = d;
            } else {
                x.coefficient = null;
            }
        }
    }
    public get genre():string {
        return this._genre;
    }
    public set genre(s:string){
        this._genre =((s !== undefined) && (s !== null) &&
            (s.trim.length > 0)) ? s.trim().toUpperCase(): null;
    }
    public get eventDate():string {
        let x = this.groupeEvent;
        return (x !== null) ? InfoRoot.date_to_string(x.eventDate) : null;
    }
    public set eventDate(s:string){
        let x = this.groupeEvent;
        if (x !== null){
            x.eventDate = InfoRoot.string_to_date(s);
        }
    }
    public get name():string {
        let x = this.groupeEvent;
        return (x !== null) ? x.name : null;
    }
    public set name(s:string){
        let x = this.groupeEvent;
        if (x !== null){
            x.name = ((s !== undefined) && (s !== null) &&
                (s.trim().length > 0)) ? s.trim() : null;
        }
    }
    public get location():string {
        let x = this.groupeEvent;
        return (x !== null) ? x.location : null;
    }
    public set location(s:string){
        let x = this.groupeEvent;
        if (x !== null){
            x.location = ((s !== undefined) && (s !== null) &&
                (s.trim().length > 0)) ? s.trim() : null;
        }
    }
    public get status():string {
        let x = this.groupeEvent;
        return (x !== null) ? x.status : null;
    }
    public set status(s:string){
        let x = this.groupeEvent;
        if (x !== null){
            x.status = ((s !== undefined) && (s !== null) &&
                (s.trim().length > 0)) ? s.trim().toUpperCase() : null;
        }
    }
    public get groupeEventDesc():string {
        let x = this.groupeEvent;
        return (x !== null) ? x.description : null;
    }
    public set groupeEventDesc(s:string){
        let x = this.groupeEvent;
        if (x !== null){
            x.description = ((s !== undefined) && (s !== null) &&
                (s.trim().length > 0)) ? s.trim().toUpperCase() : null;
        }
    }
     public get startDate(): string {
        return InfoRoot.date_to_string(this._startDate);
    }
    public set startDate(s: string) {
    }
    public get endDate(): string {
        return InfoRoot.date_to_string(this._endDate);
    }
    public set endDate(s: string) {
    }
    public get personid():string {
        return this.userInfo.personid;
    }
    public get profaffectationid():string {
        let aff = this.current_affectation;
        return (aff !== null) ? aff.id : null;
    }
    public get enseignantid():string {
        let aff = this.current_affectation;
        return (aff !== null) ? aff.enseignantid : null;
    }
    protected create_groupeevent():GroupeEvent{
        let p = new GroupeEvent({
            departementid: this.departementid,
            anneeid: this.anneeid,
            semestreid: this.semestreid,
            uniteid: this.uniteid,
            matiereid: this.matiereid,
            groupeid: this.groupeid,
            personid: this.personid,
            enseignantid: this.enseignantid,
            profaffectationid: this.profaffectationid,
            firstname: this.userInfo.firstname,
            lastname: this.userInfo.lastname,
            genre: this.genre,
            status: this.status
            });
        return p;
    }
    public get groupeEvent():GroupeEvent{
        if (this._current_groupeevent == null){
            this._current_groupeevent = this.create_groupeevent();
        }
        return this._current_groupeevent;
    }
    public set groupeEvent(g:GroupeEvent){
        if ((g !== undefined) && (g !== null)){
            this._current_groupeevent = g;
        } else {
            this._current_groupeevent = this.create_groupeevent();
        }
        this.refresh_events();
    }
    public get groupeeventid():string {
        return (this.groupeEvent !== null)? this.groupeEvent.id : null;
    }
    protected refresh_events() : any {
        this.notes = [];
        this.otherEvents = [];
        let p = this.groupeEvent;
        let id = (p !== null) ? p.id : null;
        let self = this;
        if (id === null){
            return Promise.resolve(true);
        }
        return this.dataService.get_groupeevent_evts(id).then((ee:EtudEvent[])=>{
            self.otherEvents = ((ee !== undefined) && (ee !== null)) ?
            ee : [];
            return self.dataService.check_groupeevent_notes(id);
            }).then((nn:EtudEvent[])=>{
                self.notes = ((nn !== undefined) && (nn !== null)) ? nn : [];
                return true;
                });
        }// refresh_events
    protected fill_affectations(): any {
        this._affs = [];
        this.current_affectation = null;
        this._startDate = null;
        this._endDate = null;
        this.modelGroupeEvent.personid = this.personid;
        let pPers = this.userInfo.person;
        let cont:string[] = [];
        if ((pPers !== null) && (pPers.affectationids !== undefined) &&
            (pPers.affectationids.length > 0)){
            cont = pPers.affectationids;
        }
        if (cont.length < 1){
            return Promise.resolve(true);
        }
        let self = this;
        return this.dataService.find_items_array(cont).then((aa)=>{
            self._affs = ((aa !== undefined) && (aa !== null)) ? aa : [];
            self.refresh_affectations();
            });
    }
    protected refresh_groupeevents() : any {
        let x = this.groupeEvent;
        let id = (x !== null) ? x.id : null;
        this.groupeevents = [];
        this._current_groupeevent = null;
        let semid = this.semestreid;
        let groupeid = this.groupeid;
        let matiereid = this.matiereid;
        let personid = this.personid;
        if ((semid !== null) && (groupeid !== null) &&
            (matiereid !== null) && (personid !== null)){
            let self = this;
            return this.dataService.get_all_items(this.modelGroupeEvent).then((ee:GroupeEvent[])=>{
                self.groupeevents = ((ee !== undefined) && (ee !== null)) ? ee : [];
                let pSel:GroupeEvent = null;
                if ((id !== null) && (self.groupeevents.length > 0)){
                    for (let y of self.groupeevents){
                        if (y.id == id){
                            pSel = y;
                            break;
                        }
                        }// y
                }
                if ((pSel === null) && (self.groupeevents.length > 0)){
                    pSel = self.groupeevents[0];
                }
                self.groupeEvent = pSel;
                });
        }
    }
    protected refresh_etudaffectations() :any {
        this.currentEtudAffectations = [];
        this.etudAffectations = [];
        let semid = this.semestreid;
        let groupeid = this.groupeid;
        if ((semid === null) || (groupeid === null)){
            return Promise.resolve(true);
        }
        let self = this;
        let model = new EtudAffectation({semestreid:semid,groupeid:groupeid});
        return this.dataService.get_all_items(model).then((aa:IEtudAffectationItem[])=>{
            self.etudAffectations = ((aa !== undefined) && (aa !== null)) ? aa: [];
            });
    }
    protected refresh_affectations(): any {
        this.current_affectation = null;
        let semid = this.semestreid;
        let groupeid = this.groupeid;
        let matiereid = this.matiereid;
        let genre = this.genre;
        if ((semid !== null) && (groupeid !== null) &&
            (matiereid !== null) && (genre !== null)){
            for (let x of this._affs){
                if ((x.semestreid == semid) &&
                    (x.groupeid == groupeid) &&
                    (x.matiereid == matiereid) && (x.genre == genre)){
                    this.current_affectation = x;
                    if (x.startDate !== null){
                        this._startDate = x.startDate;
                    }
                    if (x.endDate !== null){
                        this._endDate = x.endDate;
                    }
                    break;
                }
            }
        }
        return this.refresh_groupeevents();
        }// refresh_affectations
    protected post_change_departement(): any {
        let self = this;
        return super.post_change_departement().then((r)=>{
            self.refresh_affectations();
        });
    }// post_change_departement
    protected post_change_groupe(): any {
        this.modelGroupeEvent.groupeid = this.groupeid;
        let self = this;
        return this.refresh_affectations().then((r)=>{
            return self.refresh_etudaffectations();
            });
    }
    protected post_change_semestre(): any {
        this._startDate = null;
        this._endDate = null;
        let sem = this.semestre;
        if (sem !== null) {
            this._startDate = sem.startDate;
            this._endDate = sem.endDate;
        }
        this.modelGroupeEvent.semestreid = this.semestreid;
        let self = this;
        return this.refresh_affectations().then((r)=>{
            return self.refresh_etudaffectations();
            });
    }
    protected post_change_matiere(): any {
        this.modelGroupeEvent.matiereid = this.matiereid;
        return this.refresh_affectations();
    }
}// class AffectationViewModel
