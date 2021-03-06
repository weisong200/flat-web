import * as React from "react";
import {Link, withRouter} from "react-router-dom"
import {RouteComponentProps} from "react-router";
import logo from "./assets/image/logo.svg";
import join from "./assets/image/join.svg";
import create from "./assets/image/create.svg";
import "./IndexPage.less";
import {Button, Input, Popover} from "antd";
import { withTranslation, WithTranslation } from 'react-i18next';
import { SwitchLanguage } from './SwitchLanguage';

export type IndexPageStates = {
    name: string;
    visible: boolean;
};
export enum Identity {
    creator = "creator",
    joiner = "joiner",
}
class IndexPage extends React.Component<RouteComponentProps & WithTranslation, IndexPageStates> {
    public constructor(props: RouteComponentProps & WithTranslation) {
        super(props);
        const name = localStorage.getItem("userName");
        this.state = {
            name: name ? name : "",
            visible: false,
        }
    }

    private handleCreate = (): void => {
        if (this.state.name) {
            this.props.history.push(`/create/`);
        } else {
            this.props.history.push("/name/");
        }
    }

    public componentDidMount() {
        this.register();
    }

    private updateName = (isEmpty?: boolean): void => {
        if (isEmpty) {
            localStorage.removeItem("userName");
            this.setState({ visible: false, name: ""});
        } else {
            localStorage.setItem("userName", this.state.name);
            this.setState({ visible: false });
        }
    };

    private register(): void {
        if (navigator.serviceWorker && navigator.serviceWorker.register) {
            navigator.serviceWorker.register('./worker.js').then(function(registration) {
              console.log("registration finish")
            }).catch(function(error) {
              console.log('An error happened during installing the service worker:');
              console.log(error.message);
            });
        }
        
    }

    public render(): React.ReactNode {
        const { t } = this.props
            return (
                <div className="page-index-box">
                    <div className="page-index-mid-box">
                        <div className="page-index-logo-box">
                            <img src={logo} alt={"logo"} />
                            {localStorage.getItem("rooms") && (
                                <Link to={"/history"}>
                                    <div className="page-index-history">{t('historyRecord')}</div>
                                </Link>
                            )}
                            <Link to={"/storage/"}>
                                <div className="page-index-storage">{t('preload')}</div>
                            </Link>
                            <Popover visible={this.state.visible} placement={"bottom"} trigger="click" content={
                                <div className="page-index-name-box" >
                                    <Input maxLength={8}
                                           onChange={e => this.setState({name: e.target.value})}
                                           value={this.state.name} style={{width: 120}} size={"small"}/>
                                    <Button
                                        onClick={() => this.updateName()}
                                        style={{width: 120, marginTop: 12}}
                                        type={"primary"}
                                        size={"small"}>
                                        {t('update')}
                                    </Button>
                                    <Button
                                        onClick={() => this.updateName(true)}
                                        style={{ width: 120, marginTop: 12 }}
                                        size={"small"}
                                    >
                                        {t('clear')}
                                    </Button>

                                </div>
                            } title={t('editName')}>
                                <span onClick={() => this.setState({visible: true})}>
                                    <span style={{color: "#3381FF"}}>{this.state.name}</span>
                                    <span>{t('welcome')} 👋 </span>
                                </span>
                            </Popover>
                        </div>
                        <div className="page-index-start-box">
                            <div className="page-index-start-cell">
                                <Link to={"/join/"}>
                                    <img src={join} alt={"join"}/>
                                </Link>
                                <span>{t('join')}</span>
                            </div>
                            <div className="page-cutline-box"/>
                            <div className="page-index-start-cell">
                                <div onClick={this.handleCreate}>
                                    <img src={create} alt={"create"}/>
                                </div>
                                <span>{t('create')}</span>
                            </div>
                        </div>
                        <div className="page-index-link-box">
                            <div className="page-index-cell-left">
                                <a href={"https://netless.link/"} target={"_blank"}>{t('officialWebsite')}</a>
                            </div>
                            <div className="page-cutline-link-box"/>
                            <div className="page-index-cell-right">
                                <a href={"https://github.com/netless-io/react-whiteboard"} target={"_blank"}>Github</a>
                            </div>
                        </div>
                        <div className="page-index-start-term">
                            {t('license')}<a href={"https://opensource.org/licenses/MIT"} target={"_blank"}>《 {t('MITLicense')} 》</a>
                        </div>
                    </div>
                </div>
            );
    }
}

export default withRouter(withTranslation()(IndexPage));
