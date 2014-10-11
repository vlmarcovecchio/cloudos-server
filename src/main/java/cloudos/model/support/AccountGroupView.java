package cloudos.model.support;

import cloudos.model.Account;
import cloudos.model.AccountGroup;
import cloudos.model.AccountGroupInfo;
import cloudos.model.AccountGroupMember;
import com.fasterxml.jackson.databind.JavaType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.cobbzilla.util.reflect.ReflectionUtil;
import org.cobbzilla.wizard.dao.SearchResults;
import org.cobbzilla.wizard.model.NamedEntity;

import java.util.ArrayList;
import java.util.List;

@Accessors(chain=true) @NoArgsConstructor
public class AccountGroupView implements NamedEntity {

    public static final JavaType searchResultType = SearchResults.jsonType(AccountGroupView.class);

    @Getter @Setter private String name;
    @Getter @Setter private List<AccountGroupMemberView> members = new ArrayList<>();

    @Setter private Integer memberCount = null;

    public AccountGroupView(AccountGroup group) { ReflectionUtil.copy(this, group); }

    public int getMemberCount () { return memberCount != null ? memberCount : members.size(); }

    public AccountGroupView(String groupName) { setName(groupName); }

    public AccountGroupView addMember (Account account) {
        members.add(new AccountGroupMemberView(account));
        return this;
    }

    public AccountGroupView addMember (AccountGroup group) {
        members.add(new AccountGroupMemberView(group));
        return this;
    }

    public AccountGroupView addMembers(List<AccountGroupMember> groupMembers) {
        for (AccountGroupMember m : groupMembers) {
            members.add(new AccountGroupMemberView(m));
        }
        return this;
    }

    public void addMember(AccountGroupMember m) { members.add(new AccountGroupMemberView(m)); }

    @Getter @Setter private AccountGroupInfo info;
}